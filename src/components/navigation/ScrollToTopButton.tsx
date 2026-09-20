import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    toggleVisibility() // Check initial scroll position

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 px-3 py-2 rounded-md border border-[#2E2E2E] bg-[#0A0A0A]/95 backdrop-blur-md text-xs font-mono text-[#EDEDED] shadow-2xl hover:border-[#00FF66]/60 hover:text-[#00FF66] hover:shadow-[#00FF66]/10 transition-colors group cursor-pointer select-none"
          aria-label="Scroll back to top"
          title="Scroll to top [cd ~]"
        >
          <ArrowUp className="h-3.5 w-3.5 text-[#00FF66] transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span className="font-bold text-[11px] tracking-wider">TOP</span>
          <span className="text-[10px] text-[#737373] hidden sm:inline font-normal group-hover:text-[#00FF66]/70">
            [cd ~]
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
