import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { registerUser, type RegisterInput } from '../../api/user'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Alert } from '../ui/alert'
import { Link } from 'react-router-dom'
import { useState } from 'react'

type FormData = RegisterInput

export default function SignUp() {
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',
  })

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setSuccessMsg(data.message ?? 'Registration successful')
      reset()
    },
  })

  const onSubmit = (values: FormData) => {
    setSuccessMsg(null)
    mutation.reset()
    mutation.mutate(values)
  }

  const apiError =
    mutation.isError &&
    ((mutation.error as any)?.response?.data?.message ||
      (mutation.error as Error).message ||
      'Registration failed')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {apiError && <Alert variant="destructive">{String(apiError)}</Alert>}
            {successMsg && <Alert variant="success">{successMsg}</Alert>}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={errors.email ? 'true' : 'false'}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please provide a valid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600" role="alert">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                aria-invalid={errors.password ? 'true' : 'false'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-600" role="alert">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" disabled={mutation.isPending} className="w-full">
              {mutation.isPending ? 'Creating account…' : 'Sign Up'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium underline underline-offset-4">
                Log in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}