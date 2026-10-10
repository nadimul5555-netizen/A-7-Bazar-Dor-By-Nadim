import { CategoryType } from "../AllTypes";

export type MarqueeProps = {
  data: CategoryType[];
}

const MarqueePage = ({ data }: MarqueeProps) => {
  
  return (
    <div>
      {
        data.map((Data:CategoryType,ind:number)=>(
          <div key={ind}>
            {Data.icon}{Data.nameBn}
          </div>
        ))
      }
    </div>
  )
}

export default MarqueePage;