import { IoLocationOutline } from 'react-icons/io5';
import '../../styles/common/Location.scss'

type TProps = {
  location: string
}

const Location= ({ location }: TProps) => {
  return(
    <div className="location">
      <IoLocationOutline />
      <div>{location}</div>
    </div>
  );
}

export default Location;