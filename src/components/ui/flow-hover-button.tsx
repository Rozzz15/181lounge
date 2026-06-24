import {cn} from '@/lib/utils'

export const FlowHoverButton: React.FC<{
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ icon, children, className, ...props }) => (
  <button
    className={cn(`relative cursor-pointer z-0 flex items-center justify-center gap-2 overflow-hidden rounded-none 
    border border-white/60 bg-transparent 
    px-6 h-9 text-xs tracking-[0.15em] uppercase font-semibold text-white transition-all duration-500
    before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]
    before:rounded-[100%] before:bg-white before:transition-transform before:duration-1000 before:content-[""]
    hover:scale-105 hover:text-[#44362A] hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95
    hover:animate-none`, className)}
    style={{
      animation: 'beat 1.5s ease-in-out infinite',
    }}
    {...props}
  >
    <style>{`
      @keyframes beat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.08); }
      }
    `}</style>
    {icon}
    <span>{children}</span>
  </button>
)
