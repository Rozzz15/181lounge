import {cn} from '@/lib/utils'

interface FlowHoverButtonBaseProps {
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

type FlowHoverButtonProps = FlowHoverButtonBaseProps &
  ({ as: 'div' } & React.HTMLAttributes<HTMLDivElement> | { as?: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement>)

export const FlowHoverButton: React.FC<FlowHoverButtonProps> = ({ icon, children, className, as = 'button', ...props }) => {
  if (as === 'div') {
    const divProps = props as React.HTMLAttributes<HTMLDivElement>
    return (
      <div
        className={cn(`relative cursor-pointer z-0 flex items-center justify-center gap-2 overflow-hidden rounded-none
        border border-white/60 bg-transparent
        px-6 h-9 text-xs tracking-[0.15em] uppercase font-semibold text-white transition-all duration-500
        before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]
        before:rounded-[100%] before:bg-white before:transition-transform before:duration-1000 before:content-[""]
        hover:scale-105 hover:text-[#44362A] hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95
        hover:animate-none`, className)}
        {...divProps}
      >
        <style>{`
          @keyframes beat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
        `}</style>
        {icon}
        <span className="animate-[beat_1.5s_ease-in-out_infinite]">{children}</span>
      </div>
    )
  }

  const btnProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      className={cn(`relative cursor-pointer z-0 flex items-center justify-center gap-2 overflow-hidden rounded-none
      border border-white/60 bg-transparent
      px-6 h-9 text-xs tracking-[0.15em] uppercase font-semibold text-white transition-all duration-500
      before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]
      before:rounded-[100%] before:bg-white before:transition-transform before:duration-1000 before:content-[""]
      hover:scale-105 hover:text-[#44362A] hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95
      hover:animate-none`, className)}
      {...btnProps}
    >
      <style>{`
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
      {icon}
      <span className="animate-[beat_1.5s_ease-in-out_infinite]">{children}</span>
    </button>
  )
}
