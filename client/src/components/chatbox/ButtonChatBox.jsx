import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import commonContext from "../../contexts/common/commonContext";
import { useContext } from "react";


const ButtonChatBox = () => {

    const {toggleChatBox} = useContext(commonContext)

    const handleChatBox = () => {
        toggleChatBox(true)
    }

    


    return (
        <>
            <div className="btn_chatbox" onClick={() => handleChatBox()}>
                <IoChatbubbleEllipsesOutline/>
            </div>
        </>
    )
}

export default ButtonChatBox