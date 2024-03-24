import { FadeDemo } from '@/pages/sandbox-page/ui/fade-demo.tsx'
import { ScaleDemo } from '@/pages/sandbox-page/ui/scale-demo.tsx'
import { ScaleDownDemo } from '@/pages/sandbox-page/ui/scale-down-demo.tsx'
import { SlideUpDemo } from '@/pages/sandbox-page/ui/slide-up-demo.tsx'
import { SlideDownDemo } from '@/pages/sandbox-page/ui/slide-down-demo.tsx'
import { SlideRightDemo } from '@/pages/sandbox-page/ui/slide-right-demo.tsx'
import { SlideLeftDemo } from '@/pages/sandbox-page/ui/slide-left-demo.tsx'
import { List } from '@/pages/sandbox-page/ui/list/list.tsx'

export const SandboxPage = () => {
  return (
    <div>
      <h1>Sandbox Page</h1>

      <List />

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
