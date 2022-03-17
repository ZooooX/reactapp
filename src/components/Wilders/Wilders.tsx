import './Wilders.css';
import WilderService from '../../services/wilder.service';
import WilderCardComponent from '../WilderCard/WilderCard';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import WilderModalComponent from '../WilderModal/WilderModal';
import { Wilder } from '../../models/wilder.model';
import WilderFilterComponent from '../WilderFilter/WilderFilter';

interface IOpenState {
  open : boolean,
  _id : string | null
}

export interface IFilter {
  [index : string] : string | number | undefined | string[],
  name : string,
  city : string,
  skills : string []
}

export const WildersComponent = () => {

  const [wilders, setWilders] = useState([]);
  const [filter, setFilter] = useState<IFilter>({name:"",city:"",skills:[]});
  const [open, setOpen] = useState<IOpenState>({open : false, _id : null});

  
  const getWilders = async () => {
    setWilders(await WilderService.getAll());
  }
  
  useEffect(() => {
    getWilders();
  }, []);
  
  const handleCreate = () : void => setOpen({open : true, _id : null});
  const handleClose = () : void => setOpen({open : false, _id : null});
  const handleEdit = (_id : string) : void => setOpen({open : true, _id : _id});

  const handleChange = () => {
    getWilders();
  }

  const handleFilterChange = (f : IFilter) => {
    setFilter(f);
    setWilders([...wilders]);
  }

  const filterWilder = (wilder : Wilder) => {
    if(wilder.name.includes(filter.name) && wilder.city.includes(filter.city) && filter.skills.every((v) => wilder.skills.some((y) => y.title == v))) return true
    return false;
  }

  const renderWilderCards = (wilders : Wilder[]) => {
    return wilders.filter((w)=>filterWilder(w)).map((wilder : Wilder) => {
      return <div key={wilder._id} className="mtop mbot">
                <WilderCardComponent wilder={wilder} handleChange = {handleChange} handleEdit = {handleEdit}/>
            </div>
    });
  }

  return (
    <div className="wilders_container">
      <Button variant='outlined' onClick={handleCreate} className="wilders_addBtn">Ajouter un wilder</Button>
      <WilderFilterComponent handleFilterChange={handleFilterChange} filter={filter}/>
      {open.open ? <WilderModalComponent open={open.open} handleClose={handleClose} handleChange={handleChange} _id={open._id}/> : null}
      <div className='wilders_wilders'>
        {renderWilderCards(wilders)}
      </div>
    </div>
  );
}
