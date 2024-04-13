'use client';
import React from 'react'
import { TextField, Button} from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
const CreateNewIssue = () => {
  return (
    <div className='max-w-xl space-y-3'>
           <TextField.Root placeholder="Search the docs…">
  <TextField.Slot>
  </TextField.Slot>
</TextField.Root>
           <SimpleMDE placeholder="Descriptions" />
           <Button>Create New Issue</Button>

    </div>
  )
}

export default CreateNewIssue
