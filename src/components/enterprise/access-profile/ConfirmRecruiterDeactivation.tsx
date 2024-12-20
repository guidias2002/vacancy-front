import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

interface ConfirmRecruiterDeactivationProps {
    id: number; 
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function ConfirmRecruiterDeactivation({ id, open, setOpen }: ConfirmRecruiterDeactivationProps) {


    const entepriseId = localStorage.getItem("userId");
    const URL_DISABLE_RECRUITER_ACCOUNT = `http://localhost:8080/enterprise/disableRecruiterAccount/enterpriseId/${entepriseId}/recruiterId/${id}`;

    const handleClose = () => {
        setOpen(false);
    };


    const disableRecruiterAccount = async () => {

        try {
            await axios.put(URL_DISABLE_RECRUITER_ACCOUNT)
            window.location.reload();
            console.log("Recrutador desabilitado com sucesso.")
        } catch (error) {
            console.log("Erro ao desabilitar recrutador.")
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Desabilitar recrutador?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tem certeza de que deseja desabilitar o recrutador? Ele não terá mais acesso ao perfil.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button sx={{
                    bgcolor: 'fff', color: 'red', border: 'none'
                }} 
                onClick={handleClose}>Cancelar</Button>


                <Button sx={{
                    bgcolor: 'fff', color: '#87aa68', border: 'none'
                }}
                onClick={disableRecruiterAccount} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
