import { ref } from "vue"
export function useDarkMode() {
    const modeState = ref(true)
    function darkMode() {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage))) {
            document.documentElement.classList.add('dark', 'text-white', 'bg-[#121212]')
            modeState.value = false
        } else {
            document.documentElement.classList.remove('dark', 'text-white', 'bg-[#121212]')
            modeState.value = true
        }

        localStorage.theme = 'light'

        localStorage.theme = 'dark'

        localStorage.removeItem('theme')
    }
    function lightMode() {
        document.documentElement.classList.remove('dark', 'text-white', 'bg-[#121212]')
        modeState.value = true
    }

    function changeMode() {
            //白天状态
    if(modeState.value) {
        darkMode()
    }
    else {
        lightMode()
    }
    }
    return {
        modeState,
        changeMode
    }
}