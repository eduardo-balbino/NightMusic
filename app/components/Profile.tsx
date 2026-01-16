import accountIcon from "../assets/icons/account-icon.svg"

export default function Profile() {

    return (
        <div className="profile flex items-center justify-end gap-2">
            <span>John Doe</span> {/*puxar nome do usuário da API*/}
            <img src={accountIcon.src} alt="an user icon" className="w-9 h-9"/>
        </div>
    )
}