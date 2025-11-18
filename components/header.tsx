export default function Header() {
    return (
      <header className="border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400">
                <svg className="h-6 w-6 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">Go Images</h1>
            </div>
            <p className="text-2xl font-bold text-red-400 sm:block"><span className="text-green-400">জয়</span> মোহনবাগান</p>
          </div>
        </div>
      </header>
    )
  }
  