import React, {useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import SimpleTable from './table';

export default function MyDialog({ isOpen, handleClose, onSelectionChangeDialog }) {
  const [selectedItems, setSelectedItems] = useState([]);
  
  const handleSave = () => {
    const filteredItems = Object.entries(selectedItems).reduce((acc, [key, value]) => {
        const filteredValue = Object.entries(value).reduce((accVal, [subKey, subValue]) => {
          if (subValue) {
            accVal[subKey] = subValue;
          }
          return accVal;
        }, {});
    
        if (Object.keys(filteredValue).length > 0) {
          acc[key] = filteredValue;
        }
        return acc;
      }, {});
    setSelectedItems(filteredItems)
    console.log(filteredItems);
    handleClose(); 
  };

  useEffect(() => {
    onSelectionChangeDialog(selectedItems);
  }, [selectedItems, onSelectionChangeDialog]);

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <DialogContent>
        <SimpleTable  onSelectionChange={setSelectedItems} /> {/* This is where the table will be rendered */}
      </DialogContent>
      <DialogActions sx={{ padding: '16px' }}>
        <Button onClick={handleClose}>Back</Button>
        <Button onClick={handleSave} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
