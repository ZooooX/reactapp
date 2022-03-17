import { Alert, AlertColor, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import WilderService from '../../services/wilder.service';
import './WilderModal.css';
import CloseIcon from '@mui/icons-material/Close';
import { Skill } from '../../models/skill.model';
import { Wilder } from '../../models/wilder.model';


interface WilderModalComponentProps {
    _id : string | null,
    open : boolean,
    handleClose() : void,
    handleChange() : void
}

interface IOpenAlert {
    open : boolean,
    message : string,
    severity : AlertColor | undefined
}


export default function WilderModalComponent(props : WilderModalComponentProps){

    const {open, handleClose, _id} = props;

    const [skills, setSkills] = useState<Skill[]>([]);
    const [wilder, setWilder] = useState<Wilder | null>(null);
    const [openAlert, setOpenAlert] = useState<IOpenAlert>({open : false, message : "", severity : undefined});


    const nameRef = useRef<any>();
    const cityRef = useRef<any>();

    const getWilder = async (_id : string) => {
        const w : Wilder = await WilderService.getById(_id);
        setWilder(w);
        nameRef.current.value = w.name;
        cityRef.current.value = w.city;
        setSkills(w.skills);
      }

    useEffect(() => {
        if(_id) getWilder(_id);
      }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const submit = async () => {
        
        const wilder : Wilder = {
            name : nameRef.current.value,
            city : cityRef.current.value,
            skills : skills
        };

        try {
            if(_id){
                let res = await WilderService.update(_id,wilder);
                handleOpenAlert("Wilder modifié !", "success");
            }
            else{
                let res = await WilderService.create(wilder);
                handleOpenAlert("Wilder créé !", "success");
            }
            props.handleChange();
        } catch (error) {
            handleOpenAlert("Error", "error");
        }   
    }

    const handleOpenAlert = (message : string, severity : AlertColor) => {
        setOpenAlert({open : true, message:message, severity:severity});
        setTimeout(() => {
            setOpenAlert({open : false, message:"", severity:undefined});
        }, 4000);
    }

    const handleFormChange = (event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index : number) => {
        let data : Skill[] = [...skills];
        data[index][event.target.name] = event.target.value;
        setSkills(data);
    }

    const addSkill = () => {
        
        let skill : Skill = {
            title: '',
            votes: 0
          };
      
        setSkills([...skills, skill]);
    }

    const deleteSkill = (index : number) => {
        let data = [...skills];
        data.splice(index, 1);
        setSkills(data);
    }

    const renderSkills = () => {
        return skills.map((skill, index) => {
            return <div key={index} className="skillInputs">
                        <TextField value={skill.title} name="title" label="Title" variant="standard" onChange={(event) => handleFormChange(event,index)} InputLabelProps={{ shrink: true }}/>
                        <TextField value={skill.votes} name="votes" type='number' label="Votes" variant="standard" onChange={(event) => handleFormChange(event,index)} InputLabelProps={{ shrink: true }}/>
                        <Button variant='outlined' onClick={() => deleteSkill(index)}>Delete</Button>
                    </div>;
        });
    }

    const renderAlert = () => {
        if(openAlert.open){
            return <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenAlert({open : false, message : "", severity :undefined});
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mt:2 }}
                        severity={openAlert.severity}
                        >
                        {openAlert.message}
                    </Alert>
        }
    }
    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={{fontWeight : "bold", textAlign:"center"}}>Ajouter un wilder</div>
                <form >
                    <div style={{fontWeight : "bold"}}>Infos</div>
                    <TextField id="standard-basic" label="Name" variant="standard" inputRef={nameRef} InputLabelProps={{ shrink: true }}/>
                    <br/>
                    <TextField id="standard-basic" label="City" variant="standard" inputRef={cityRef} InputLabelProps={{ shrink: true }}/>
                    <div>
                        <div style={{fontWeight : "bold"}}>Skills</div>
                        <div>
                            {renderSkills()}
                        </div>
                        <Button variant='outlined' style={{marginTop:"10px", marginBottom:"10px"}} onClick={addSkill}>Ajouter un skill</Button>
                    </div>
                    <Button variant="contained" onClick={submit}>{_id ? "Modifier le wilder" : "Créer le wilder"}</Button>
                </form>
                {renderAlert()}
            </Box>
        </Modal>
    )
}