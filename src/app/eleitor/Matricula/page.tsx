'use client'

import React from 'react'
import { getVoterId } from '@/requests/voter/findAll';
import {useForm} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import IFUrna from '@/img/logo-name.svg'
import HalfCircle from '@/img/cloud-bottom-mid.svg'
import CloudTop from '@/img/cloud-top-right.svg'
import CloudBottom from '@/img/cloud-bottom-right.svg'

export default function Matricula() {
    return (
        <main className='grid grid-cols-3 mx-auto min-h-screen'>
            <div className='py-16 p-16 primary-bg-red'>
                <Image src={IFUrna} alt={'urna'} />
            </div>

            <div className='enrollmentInfo'>
                <h3 className='text-4xl text-center'>Informe sua matrícula para acessar as votações</h3>
                <div>
                    <form className='flex flex-col items-center gap-7'>
                        <div className='flex flex-col items-start gap-2' style={{width:"470px"}}>
                            <label htmlFor="enrollment" style={{fontSize:"1.2rem", color:"rgba(0,0,0,0.4)"}}>Matrícula</label>
                            <input type="text" id='enrollment' className='border border-black rounded-xl p-2 w-full' />
                        </div>
                        <button type="button" id='enrollmentBtn' className='primary-bg-red'>Entrar</button>
                    </form>
                </div>
                <Image src={HalfCircle} alt={'circle'} className='absolute bottom-0' style={{ left: '38vw' }} />
                <Image src={CloudTop} alt={'top'} className='absolute top-0 right-0' />
                <Image src={CloudBottom} alt={'bottom'} className='absolute bottom-0 right-0' />
            </div>
        </main>
    )
}