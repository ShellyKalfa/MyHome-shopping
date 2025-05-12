import { PiUserListFill } from "react-icons/pi";

export default function ItemFamily({family}) {
    return (  <div className="ItemFamliy">
        
        <PiUserListFill />
        
        {family}
    </div>);
};