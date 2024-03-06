import { FadeDemo } from '@/routes/sandbox-page/ui/fade-demo.tsx'
import { ScaleDemo } from '@/routes/sandbox-page/ui/scale-demo.tsx'
import { ScaleDownDemo } from '@/routes/sandbox-page/ui/scale-down-demo.tsx'

export const SandboxPage = () => {
  return (
    <div>
      <h1>Sandbox Page</h1>

      <FadeDemo />
      <ScaleDemo />
      <ScaleDownDemo />
    </div>
  )
}
