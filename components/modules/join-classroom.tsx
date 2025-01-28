'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { TabsContent } from '../ui/tabs'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { LogIn } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import {
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogContent,
    Dialog,
    DialogTrigger
} from '../ui/dialog'
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from '../ui/select'
import { classroom } from '@/lib/db/schema'

export default function JoinClassroom({ role }: { role: string }) {
    const [JoinClass, setJoinClass] = useState('') //I think this is usless and makes no sense because you not putting this into the api you just fetching it so you dont need to store it right?
    const [code, setCode] = useState('')
    const session = authClient.useSession()

    
    
    const resetForm = () => {
        setCode('')
    }
    
    
    const joinClass = async () =>{
        console.log("studentCode from class",code);
        console.log("DataId From class",session.data?.session.userId );

        if (code === '') {
            toast.error("Text not input ")
            return; 
        }

        await fetch('/api/classroom_member', {
            method: 'POST',
            body: JSON.stringify({
                [role === 'student' ? 'studentCode' : 'teacherCode']: code,
                userId: session.data?.session.userId || '',
            })
        })
            .then(response => {
                if (!response.ok) {
                    toast.error("Unable to join class")
                }
                return response
            })
    }
    
    return (
        <Dialog onOpenChange={resetForm}>
            <DialogTrigger asChild>
                    {/* I added somthing here dont forget it Put it in use effect so dont need this*/}
                <Button variant='outline'>  
                    <div>Join</div>
                    <LogIn size={32} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Join Classroom</DialogTitle>
                <Label htmlFor='name' className='text-neutral-700'>
                            Class Code  
                        </Label>
                        <Input
                            id='name'
                            className='bg-white text-neutral-700'
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                <DialogFooter className='sm:justify-start'>
                    <DialogClose asChild>
                        <Button type='button' variant='secondary'>
                            Close
                        </Button>
                    </DialogClose>
                    <Button
                        type='submit'
                        className='rounded bg-blue-500 py-2 font-semibold text-white transition duration-200 hover:bg-blue-600'
                        onClick= {()=>{
                            joinClass();
                            // inClassAlready();
                        }}
                    >
                        Join
                    </Button>
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
