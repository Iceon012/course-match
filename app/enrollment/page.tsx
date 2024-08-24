"use client";
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, UserIcon, BookOpenIcon, ClipboardCheckIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link';

export default function Stepper() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    courses: [],
    agreeToTerms: false
  })

  const steps = [
    { title: 'Personal Info', icon: UserIcon },
    { title: 'Course Selection', icon: BookOpenIcon },
    { title: 'Confirmation', icon: ClipboardCheckIcon },
    { title: 'Complete', icon: CheckIcon }
  ]

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCourseToggle = (course:any) => {
    setFormData((prev:any) => ({
      ...prev,
      courses: prev.courses.includes(course)
        ? prev.courses.filter((c:any) => c !== course)
        : [...prev.courses, course]
    }))
  }

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4))
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1))

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.dateOfBirth && formData.gender
      case 2:
        return formData.courses.length > 0
      case 3:
        return formData.agreeToTerms
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup name="gender" value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" value={formData.address} onChange={handleInputChange} />
            </div>
          </CardContent>
        )
      case 2:
        return (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Courses</Label>
              {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'].map((course) => (
                <div key={course} className="flex items-center space-x-2">
                  <Checkbox 
                    id={course} 
                    checked={formData.courses.includes(course as never)}
                    onCheckedChange={() => handleCourseToggle(course)}
                  />
                  <Label htmlFor={course}>{course}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        )
      case 3:
        return (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Enrollment Summary</h3>
              <p>Name: {formData.firstName} {formData.lastName}</p>
              <p>Email: {formData.email}</p>
              <p>Date of Birth: {formData.dateOfBirth}</p>
              <p>Gender: {formData.gender}</p>
              <p>Address: {formData.address}</p>
              <p>Courses: {formData.courses.join(', ')}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => setFormData((prev:any) => ({ ...prev, agreeToTerms: checked }))}
              />
              <Label htmlFor="terms">I agree to the terms and conditions</Label>
            </div>
          </CardContent>
        )
      case 4:
        return (
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <CheckIcon className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-2xl font-semibold">Enrollment Successful!</h3>
              <p>Congratulations, {formData.firstName}! You have successfully enrolled in your courses.</p>
              <p>An email confirmation has been sent to {formData.email}.</p>
              <Link href="/dashboard">
               <p className='bg-[#38f094] rounded-lg text-white p-2 hover:bg-[#00bf63] mt-5 max-w-64 mx-auto'> Go to Student Dashboard</p>
              </Link>
            </div>
          </CardContent>
        )
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      {/* <CardHeader>
        <CardTitle>Student Enrollment System</CardTitle>
        <CardDescription>Complete the form to enroll in courses</CardDescription>
      </CardHeader> */}
      <CardContent>
        <div className="flex justify-center mb-8 mt-14">
          <div className="flex items-center">
            {steps.map((s, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center
                      ${step > index + 1 ? 'bg-[#38f094] text-primary-foreground' : 
                        step === index + 1 ? 'border-primary text-primary' : 
                        'border-muted text-muted-foreground'}`}
                    aria-current={step === index + 1 ? "step" : undefined}
                  >
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm mt-2 text-center w-20">{s.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-px w-16 mx-2 mt-6 ${step > index + 1 ? 'bg-[#38f094]' : 'bg-[#38f094]'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {renderStep()}
      </CardContent>
      {step < 4 && (
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button className='hover:bg-[#38f094]' variant="outline" onClick={handlePrev}>
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> Previous
            </Button>
          )}
          {step < 3 ? (
            <Button style={{backgroundColor: '#00bf63'}}  onClick={handleNext} disabled={!isStepComplete()}>
              Next <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button style={{backgroundColor: '#00bf63'}} onClick={handleNext} disabled={!isStepComplete()}>
              Submit <CheckIcon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}