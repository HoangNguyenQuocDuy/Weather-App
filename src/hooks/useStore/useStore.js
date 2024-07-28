import { useContext } from "react";
import StoreContext from '../../store/Context'

export default function useStore() {
    const [state, dispatch] = useContext(StoreContext)

    return [state, dispatch]
}