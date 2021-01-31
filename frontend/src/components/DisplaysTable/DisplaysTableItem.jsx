import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import Icon from '@material-ui/core/Icon';
import { Switch } from '@material-ui/core';
import PopoverSure from 'components/PopoverSure';
import DisplaySegmentsDialog from 'components/DisplaySegmentsDialog';
import { camelToSnake } from 'utils/helpers';
const styles = theme => ({
    deleteButton: {
        minWidth: 32,
    },
    editButton: {
        minWidth: 32,
        marginLeft: theme.spacing(1),
    },
    displayLink: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    displaySettings: {
        '@media (max-width: 1200px)': {
            display: 'none',
        },
    },
});

function DisplaysTableItem({
    display,
    device,
    onDelete,
    classes,
    onEditDevice,
    onEditDisplay,
    deviceList,
}) {
    const handleDeleteDevice = () => {
        onDelete(display.id);
    };

    const handleEditDisplay = () => {
        onEditDisplay(display);
    };
    const handleEditDevice = () => {
        onEditDevice(deviceList.find(d => d.id === display.is_device));
    };

    return (
        <TableRow key={display.id}>
            <TableCell component="th" scope="row" width="35px">
                <Icon style={{ verticalAlign: 'bottom' }}>
                    {camelToSnake(display.config.icon_name || 'SettingsInputComponent')}
                </Icon>
            </TableCell>
            <TableCell>
                <NavLink
                    to={'/displays/' + display.id}
                    className={classes.displayLink}
                    key={display.id}
                    color="inherit"
                >
                    {display.config.name}
                </NavLink>
            </TableCell>
            <TableCell className={classes.displaySettings}>
                {display.config.max_brightness}
            </TableCell>
            <TableCell className={classes.displaySettings}>{display.config.crossfade}</TableCell>
            <TableCell className={classes.displaySettings}>
                {display.config.center_offset}
            </TableCell>
            <TableCell className={classes.displaySettings}>
                <Switch checked={display.config.preview_only} />
            </TableCell>
            <TableCell align="right">
                <PopoverSure onConfirm={handleDeleteDevice} className={classes.deleteButton} />

                {display.is_device ? (
                    <Button
                        variant="contained"
                        size="small"
                        className={classes.editButton}
                        onClick={handleEditDevice}
                    >
                        <SettingsIcon />
                    </Button>
                ) : (
                    <DisplaySegmentsDialog
                        display={display}
                        className={classes.editButton}
                        icon={<SettingsIcon />}
                    />
                )}
                <Button
                    variant="contained"
                    size="small"
                    className={classes.editButton}
                    onClick={handleEditDisplay}
                >
                    <EditIcon />
                </Button>
            </TableCell>
        </TableRow>
    );
}

DisplaysTableItem.propTypes = {
    classes: PropTypes.object.isRequired,
    display: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(DisplaysTableItem);
