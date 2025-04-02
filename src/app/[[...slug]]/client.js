'use client'
 
import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../Client/MainPage'), { ssr: true })

export function ClientOnly() {
  return <App />
}