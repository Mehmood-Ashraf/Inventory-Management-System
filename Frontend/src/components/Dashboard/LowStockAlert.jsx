import React from 'react'
import Card1 from '../../components/Card'
import { TriangleAlert } from 'lucide-react'

const LowStockAlert = () => {
  return (
    <div className='w-full'>
        <Card1 title={"Low Stock Alert"} className="lg:w-full cursor-pointer">
          <Card1 iconClass={"text-red-500"} icon={TriangleAlert} title={"I-phone 15 pro"} subtitle={"Stock : 7"} className="border-red-400"></Card1>
          {/* <Card1 iconClass={"text-red-500"} icon={TriangleAlert} title={"I-phone 15 pro"} subtitle={"Stock : 7"} className="border-red-400"></Card1> */}
        </Card1>
    </div>
  )
}

export default LowStockAlert