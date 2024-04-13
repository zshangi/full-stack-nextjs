'use client';
import React from 'react'
import { TextField, Button} from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import {useForm,Controller} from 'react-hook-form'
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface IssueForm{
  title: string;
  description:string;
}
const CreateNewIssue = () => {
  const router=useRouter();
  const {register,control,handleSubmit}=useForm<IssueForm>();
  return (
    <form 
    className='max-w-xl space-y-3' 
    onSubmit={handleSubmit(async(data)=>{
    await axios.post('/api/issues',data);
    router.push('/issues')
    })
    }>
           <TextField.Root placeholder="title" {...register('title')}>
  <TextField.Slot>
  </TextField.Slot>
</TextField.Root>
<Controller
name='description'
control={control}
render={({field})=><SimpleMDE placeholder="Descriptions" {...field} />
}></Controller>
           <Button>Create New Issue</Button>

    </form>
  )
}

export default CreateNewIssue
