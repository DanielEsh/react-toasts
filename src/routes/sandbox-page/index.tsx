import { FadeDemo } from '@/routes/sandbox-page/ui/fade-demo.tsx'
import { ScaleDemo } from '@/routes/sandbox-page/ui/scale-demo.tsx'
import { ScaleDownDemo } from '@/routes/sandbox-page/ui/scale-down-demo.tsx'
import { SlideUpDemo } from '@/routes/sandbox-page/ui/slide-up-demo.tsx'
import { SlideDownDemo } from '@/routes/sandbox-page/ui/slide-down-demo.tsx'
import { SlideRightDemo } from '@/routes/sandbox-page/ui/slide-right-demo.tsx'
import { SlideLeftDemo } from '@/routes/sandbox-page/ui/slide-left-demo.tsx'

export const SandboxPage = () => {
  return (
    <div>
      <h1>Sandbox Page</h1>

      <FadeDemo />
      <ScaleDemo />
      <ScaleDownDemo />
      <SlideDownDemo />
      <SlideUpDemo />
      <SlideRightDemo />
      <SlideLeftDemo />
    </div>
  )
}
