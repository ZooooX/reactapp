import SkillComponent from "../Skill/Skill";
import './WilderCard.css'
import {Card, CardContent, CardHeader, IconButton, Menu, MenuItem} from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { makeStyles } from "@mui/styles";
import { MouseEvent, useState } from "react";
import WilderService from "../../services/wilder.service";
import { Skill } from "../../models/skill.model";
import { Wilder } from "../../models/wilder.model";

interface WilderCardComponentProps {
    wilder : Wilder,
    handleChange() : void,
    handleEdit(_id : string | undefined) : void
}

export default function WilderCardComponent(props : WilderCardComponentProps){

    const [anchorEl, setAnchorEl] = useState(null);

    const {_id, skills, city, name} = props.wilder;

    const renderSkills = (skills : Skill[]) => {
        return skills.map((skill : Skill) => {
            return <SkillComponent key={skill._id} skill={skill}/>
        })
    }

    const classes = useStyles();

    const handleClick = (event : MouseEvent<any>) : void => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () : void => {
        setAnchorEl(null);
    };

    const handleDelete = async (_id : string) : Promise<void> => {
        try {
            await WilderService.delete(_id);
            props.handleChange();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card variant="outlined">
            <CardHeader
                avatar={
                    <InsertEmoticonIcon htmlColor="#FFD700" fontSize="large"/>
                }
                title={name}
                classes={{root:classes.root}}
                action={
                    <IconButton aria-label="settings" classes={{root:classes.root}} onClick={handleClick}>
                        <MoreVertIcon htmlColor="#FFD700"/>
                    </IconButton>
                }
            />
            <CardContent>
                <div className="cityContainer mbot">
                    <div className="wildercard_label">City</div>
                    <div className="wildercard_iconAndName">
                        <LocationCityIcon htmlColor="black" fontSize="large"/>
                        <span style={{marginLeft:"5px"}}>
                            {city}
                        </span>
                    </div>
                </div>
                <div className="skillsContainer">
                    <div className="wildercard_label">Skills</div>
                    <div className="wildercard_skills">
                        {renderSkills(skills)}
                    </div>
                </div>
            </CardContent>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => props.handleEdit(_id)} disableRipple>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem onClick={() => _id ? handleDelete(_id) : null} disableRipple>
                    <DeleteIcon />
                    Delete
                </MenuItem>
            </Menu>
        </Card>
    );
}

const useStyles = makeStyles({
    root: {
       color: "#FFD700"
    }
})