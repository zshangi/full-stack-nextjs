'use client';
import React, { useState } from 'react'
import { TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form'
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Callout } from '@radix-ui/themes';
interface IssueForm {
  title: string;
  description: string;
}
const CreateNewIssue = () => {
  const [error, setError] = useState('')
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  return (
    <div  className='max-w-xl'>
      {error&&
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
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Descriptions" {...field} />
          }></Controller>
        <Button>Create New Issue</Button>

      </form>
    </div>
  )
}

export default CreateNewIssue
