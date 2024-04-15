'use client';
import React, { useState } from 'react'
import { TextField, Button, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form'
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Callout } from '@radix-ui/themes';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueShcema } from '@/app/validationShcemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
type IssueForm = z.infer<typeof createIssueShcema>
const CreateNewIssue = () => {
  const [error, setError] = useState('')
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueShcema)
  });
  return (
    <div className='max-w-xl'>
      {error &&
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text >
            {error}
          </Callout.Text>
        </Callout.Root>
      }
      <form
        className=' space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues')

          } catch (error) {
            setError('An expected error happend')

          }

        })
        }>
        <TextField.Root placeholder="title" {...register('title')}>
          <TextField.Slot>
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}

        </ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Descriptions" {...field} />
          }></Controller>
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>

        <Button>Create New Issue</Button>

      </form>
    </div>
  )
}

export default CreateNewIssue
