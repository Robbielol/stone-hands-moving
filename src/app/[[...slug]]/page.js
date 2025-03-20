import { ClientOnly } from './client'
import '../../Client/App.css'
 
export function generateStaticParams() {
  return [{ slug: [''] }]
}
 
export default function Page() {
  return (
  <div className='site-wrapper'>
    <ClientOnly />
  </div>
  );
}