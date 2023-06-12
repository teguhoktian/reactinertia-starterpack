export const sidebarToggle = () => {
    const width = document.body.clientWidth
    const isMobile = width < 768
    if(isMobile){
        const target = document.getElementById('sidebar')
        if(target.classList.contains('-translate-x-64')){
            target.classList.remove('-translate-x-64')
            target.classList.add('translate-x-0')
        }else{
            target.classList.add('-translate-x-64')
            target.classList.remove('translate-x-0')
        }
    }
}
