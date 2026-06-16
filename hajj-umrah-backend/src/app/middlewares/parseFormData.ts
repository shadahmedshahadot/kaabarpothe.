import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import multer from 'multer'

import { sendImageCloudinary, upload } from '../utils/sendImageToCloudinary'
import AppError from '../errors/AppError'

interface ParseOptions {
  /**
   * Cloudinary subfolder under `hajj-umrah/<folder>`.
   */
  folder: string
  /**
   * If true, accept a single `cover` file (req.body.cover ← URL).
   */
  cover?: boolean
  /**
   * If true, accept multi `gallery` files (req.body.gallery ← URL[]).
   */
  gallery?: boolean
  /**
   * If true, accept multi `images` files (req.body.images ← URL[]).
   */
  images?: boolean
  /**
   * Single avatar file (req.body.avatar ← URL).
   */
  avatar?: boolean
  /**
   * Fields whose value comes as a JSON-encoded string and should be parsed.
   * Example: `itinerary`, `faqs`, `ziyarah`, `included`.
   */
  jsonFields?: string[]
  /**
   * Numeric fields. Multipart sends everything as string — coerce here.
   */
  numberFields?: string[]
  /**
   * Boolean fields. Accepts 'true' / 'false' / true / false.
   */
  booleanFields?: string[]
  /**
   * Max files accepted per array field.
   */
  maxFiles?: number
}

const uploadAll = async (files: Express.Multer.File[], folder: string) => {
  const results = await Promise.all(
    files.map(f => sendImageCloudinary(f.buffer, f.originalname, folder)),
  )
  return results.map(r => r.secure_url)
}

export const parseFormData = (opts: ParseOptions) => {
  const fields: multer.Field[] = []
  if (opts.cover) fields.push({ name: 'cover', maxCount: 1 })
  if (opts.avatar) fields.push({ name: 'avatar', maxCount: 1 })
  if (opts.gallery) fields.push({ name: 'gallery', maxCount: opts.maxFiles ?? 20 })
  if (opts.images) fields.push({ name: 'images', maxCount: opts.maxFiles ?? 20 })

  const multerMw = fields.length ? upload.fields(fields) : upload.none()
  const cloudFolder = `hajj-umrah/${opts.folder}`

  const handler = async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const files = req.files as
        | { [k: string]: Express.Multer.File[] | undefined }
        | undefined

      if (files?.cover?.[0]) {
        const r = await sendImageCloudinary(
          files.cover[0].buffer,
          files.cover[0].originalname,
          cloudFolder,
        )
        req.body.cover = r.secure_url
      }

      if (files?.avatar?.[0]) {
        const r = await sendImageCloudinary(
          files.avatar[0].buffer,
          files.avatar[0].originalname,
          cloudFolder,
        )
        req.body.avatar = r.secure_url
      }

      if (files?.gallery?.length) {
        req.body.gallery = await uploadAll(files.gallery, cloudFolder)
      } else if (opts.gallery && typeof req.body.gallery === 'string' && req.body.gallery.length) {
        try {
          req.body.gallery = JSON.parse(req.body.gallery)
        } catch {
          throw new AppError(httpStatus.BAD_REQUEST, 'Field "gallery" must be valid JSON array')
        }
      }

      if (files?.images?.length) {
        req.body.images = await uploadAll(files.images, cloudFolder)
      } else if (opts.images && typeof req.body.images === 'string' && req.body.images.length) {
        try {
          req.body.images = JSON.parse(req.body.images)
        } catch {
          throw new AppError(httpStatus.BAD_REQUEST, 'Field "images" must be valid JSON array')
        }
      }

      // Parse JSON-encoded fields
      if (opts.jsonFields) {
        for (const k of opts.jsonFields) {
          const v = req.body[k]
          if (typeof v === 'string' && v.length) {
            try {
              req.body[k] = JSON.parse(v)
            } catch {
              throw new AppError(httpStatus.BAD_REQUEST, `Field "${k}" must be valid JSON`)
            }
          }
        }
      }

      // Coerce numbers
      if (opts.numberFields) {
        for (const k of opts.numberFields) {
          const v = req.body[k]
          if (v === undefined || v === '') continue
          const n = Number(v)
          if (!Number.isFinite(n)) {
            throw new AppError(httpStatus.BAD_REQUEST, `Field "${k}" must be a number`)
          }
          req.body[k] = n
        }
      }

      // Coerce booleans
      if (opts.booleanFields) {
        for (const k of opts.booleanFields) {
          const v = req.body[k]
          if (v === undefined) continue
          req.body[k] = v === true || v === 'true' || v === '1'
        }
      }

      next()
    } catch (err) {
      next(err)
    }
  }

  return [multerMw, handler]
}

export default parseFormData
