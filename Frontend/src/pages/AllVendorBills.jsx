import React, { useState } from 'react'
import SearchInput from '../components/SearchInput'
import Button from '../components/Button';
import { Plus } from 'lucide-react';

const AllVendorBills = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center gap-4'>
        <SearchInput 
        placeholder={"Search Bill....."}
        value={searchInput}
        onChange={setSearchInput}
        />
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Bill
          
        </Button>
      </div>
      
    </div>
  )
}

export default AllVendorBills