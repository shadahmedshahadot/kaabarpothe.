'use client'

import { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Input, Label, Select } from '@/components/ui/input'
import { CoverUpload } from '@/components/common'
import {
  useGetMeQuery,
  useUpdateMeMutation,
} from '@/redux/fetchres/user/userApi'
import { useChangePasswordMutation } from '@/redux/fetchres/auth/authApi'

const toDateInput = (iso?: string | null) => (iso ? iso.slice(0, 10) : '')

export default function PilgrimProfilePage() {
  const { data, isLoading, isError, refetch } = useGetMeQuery()
  const [updateMe, { isLoading: isSaving }] = useUpdateMeMutation()
  const [changePassword, { isLoading: isChangingPwd }] = useChangePasswordMutation()

  const [full_name, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | ''>('')
  const [nationality, setNationality] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [avatar, setAvatar] = useState('')

  const [passportNumber, setPassportNumber] = useState('')
  const [passportIssueDate, setPassportIssueDate] = useState('')
  const [passportExpiryDate, setPassportExpiryDate] = useState('')
  const [passportCountry, setPassportCountry] = useState('')

  const [ecName, setEcName] = useState('')
  const [ecRel, setEcRel] = useState('')
  const [ecPhone, setEcPhone] = useState('')

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    const u = data?.data
    if (!u) return
    setFullName(u.full_name ?? '')
    setPhone(u.phone ?? '')
    setDateOfBirth(toDateInput(u.dateOfBirth))
    setGender((u.gender as 'MALE' | 'FEMALE') ?? '')
    setNationality(u.nationality ?? '')
    setAddress(u.address ?? '')
    setCity(u.city ?? '')
    setCountry(u.country ?? '')
    setAvatar(u.avatar ?? '')
    setPassportNumber(u.passportNumber ?? '')
    setPassportIssueDate(toDateInput(u.passportIssueDate))
    setPassportExpiryDate(toDateInput(u.passportExpiryDate))
    setPassportCountry(u.passportCountry ?? '')
    setEcName(u.emergencyContactName ?? '')
    setEcRel(u.emergencyContactRelationship ?? '')
    setEcPhone(u.emergencyContactPhone ?? '')
  }, [data])

  const onSave = async () => {
    if (!full_name.trim()) {
      toast.error('পূর্ণ নাম প্রয়োজন')
      return
    }
    const fd = new FormData()
    fd.append('full_name', full_name)
    if (phone) fd.append('phone', phone)
    if (dateOfBirth) fd.append('dateOfBirth', dateOfBirth)
    if (gender) fd.append('gender', gender)
    if (nationality) fd.append('nationality', nationality)
    if (address) fd.append('address', address)
    if (city) fd.append('city', city)
    if (country) fd.append('country', country)
    if (avatar) fd.append('avatar', avatar)
    if (passportNumber) fd.append('passportNumber', passportNumber)
    if (passportIssueDate) fd.append('passportIssueDate', passportIssueDate)
    if (passportExpiryDate) fd.append('passportExpiryDate', passportExpiryDate)
    if (passportCountry) fd.append('passportCountry', passportCountry)
    if (ecName) fd.append('emergencyContactName', ecName)
    if (ecRel) fd.append('emergencyContactRelationship', ecRel)
    if (ecPhone) fd.append('emergencyContactPhone', ecPhone)

    try {
      await updateMe(fd).unwrap()
      toast.success('প্রোফাইল আপডেট সফল হয়েছে')
      refetch()
    } catch (err: any) {
      console.error('updateMe error:', err)
      const zodErrors = err?.data?.error
      if (Array.isArray(zodErrors) && zodErrors.length) {
        toast.error(`${zodErrors[0].path}: ${zodErrors[0].message}`)
      } else {
        toast.error(err?.data?.message || 'আপডেট ব্যর্থ হয়েছে')
      }
    }
  }

  const onChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error('পুরাতন ও নতুন পাসওয়ার্ড প্রয়োজন')
      return
    }
    if (newPassword.length < 6) {
      toast.error('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে')
      return
    }
    try {
      await changePassword({ old_password: oldPassword, new_password: newPassword }).unwrap()
      toast.success('পাসওয়ার্ড পরিবর্তন সফল হয়েছে')
      setOldPassword('')
      setNewPassword('')
    } catch (err: any) {
      toast.error(err?.data?.message || 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="text-center py-40 text-rose-500">
        প্রোফাইল লোড করতে ব্যর্থ হয়েছে। লগ-ইন করেছেন কি?
      </div>
    )
  }

  const u = data.data

  return (
    <>
      <PageTitle
        title="প্রোফাইল"
        description="আপনার ব্যক্তিগত তথ্য হালনাগাদ রাখুন।"
        action={
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary disabled:opacity-60"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            সংরক্ষণ
          </button>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="ব্যক্তিগত তথ্য">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>পূর্ণ নাম</Label>
                <Input value={full_name} onChange={e => setFullName(e.target.value)} />
              </div>
              <div>
                <Label>ইমেইল</Label>
                <Input type="email" value={u.email} disabled />
              </div>
              <div>
                <Label>ফোন</Label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+880 17..." />
              </div>
              <div>
                <Label>জন্ম তারিখ</Label>
                <Input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
              </div>
              <div>
                <Label>লিঙ্গ</Label>
                <Select value={gender} onChange={e => setGender(e.target.value as 'MALE' | 'FEMALE' | '')}>
                  <option value="">নির্বাচন করুন</option>
                  <option value="MALE">পুরুষ</option>
                  <option value="FEMALE">নারী</option>
                </Select>
              </div>
              <div>
                <Label>জাতীয়তা</Label>
                <Input value={nationality} onChange={e => setNationality(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <Label>ঠিকানা</Label>
                <Input value={address} onChange={e => setAddress(e.target.value)} />
              </div>
              <div>
                <Label>শহর</Label>
                <Input value={city} onChange={e => setCity(e.target.value)} />
              </div>
              <div>
                <Label>দেশ</Label>
                <Input value={country} onChange={e => setCountry(e.target.value)} />
              </div>
            </div>
          </Card>

          <Card title="পাসপোর্ট">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>পাসপোর্ট নম্বর</Label>
                <Input value={passportNumber} onChange={e => setPassportNumber(e.target.value)} />
              </div>
              <div>
                <Label>ইস্যুকারী দেশ</Label>
                <Input value={passportCountry} onChange={e => setPassportCountry(e.target.value)} />
              </div>
              <div>
                <Label>ইস্যু তারিখ</Label>
                <Input type="date" value={passportIssueDate} onChange={e => setPassportIssueDate(e.target.value)} />
              </div>
              <div>
                <Label>মেয়াদ শেষ তারিখ</Label>
                <Input type="date" value={passportExpiryDate} onChange={e => setPassportExpiryDate(e.target.value)} />
              </div>
            </div>
          </Card>

          <Card title="জরুরি যোগাযোগ">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>নাম</Label>
                <Input value={ecName} onChange={e => setEcName(e.target.value)} />
              </div>
              <div>
                <Label>সম্পর্ক</Label>
                <Input value={ecRel} onChange={e => setEcRel(e.target.value)} placeholder="স্বামী / স্ত্রী / ভাই" />
              </div>
              <div>
                <Label>ফোন</Label>
                <Input value={ecPhone} onChange={e => setEcPhone(e.target.value)} />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <CoverUpload value={avatar} onChange={setAvatar} folder="avatars" label="" aspect="square" />
            <p className="font-bold text-foreground mt-3">{full_name || u.email}</p>
            <p className="text-xs text-muted-foreground">
              সদস্য {new Date(u.joinedDate).getFullYear()} থেকে
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-muted/30 rounded-lg p-2">
                <p className="text-muted-foreground">বুকিং</p>
                <p className="font-bold text-foreground">{u.bookingsCount}</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-2">
                <p className="text-muted-foreground">মোট</p>
                <p className="font-bold text-foreground">${u.totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <Card title="পাসওয়ার্ড পরিবর্তন">
            <div className="space-y-3">
              <div>
                <Label>পুরাতন পাসওয়ার্ড</Label>
                <Input
                  type="password"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                />
              </div>
              <div>
                <Label>নতুন পাসওয়ার্ড</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={onChangePassword}
                disabled={isChangingPwd}
                className="w-full bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-primary disabled:opacity-60"
              >
                {isChangingPwd ? <Loader2 className="w-4 h-4 animate-spin" /> : 'পরিবর্তন'}
              </button>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="font-bold text-foreground mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
