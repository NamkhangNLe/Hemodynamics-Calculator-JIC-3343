import React, { useState, useEffect } from 'react';

const HardwareForm = ({ form, updateForm }) => {
    const [hardwareInfo, setHardwareInfo] = useState([]);

    useEffect(() => {
        setHardwareInfo(form.hardware || []);
    }, [form.hardware]);

    const handleCheckboxChange = (deviceName, checked) => {
        if (!checked) {

            setHardwareInfo(prev => prev.filter(device => device.deviceName !== deviceName));
            const newDevice = { deviceName, field1: '', field2: '' };
            updateForm({ hardware: newDevice }, 1);

        } else {

            if (deviceName === 'Impella') {
                const newDevice = { deviceName, position: '', p: '', flow: '', motorCurrent: '', alarm: '' };
                setHardwareInfo(prev => [...prev.filter(device => device.deviceName !== deviceName), newDevice]);
                updateForm({ hardware: [...hardwareInfo.filter(device => device.deviceName !== deviceName), newDevice] }, 0);

            } else if (deviceName === 'IABP') {
                const newDevice = { deviceName, position: '', trigger: '', alarm: ''};
                setHardwareInfo(prev => [...prev.filter(device => device.deviceName !== deviceName), newDevice]);
                updateForm({ hardware: [...hardwareInfo.filter(device => device.deviceName !== deviceName), newDevice] }, 0);

            } else if (deviceName === 'VAD') {
                const newDevice = { deviceName, type: '', speed: '', flow: '', power: '', alarm: ''};
                setHardwareInfo(prev => [...prev.filter(device => device.deviceName !== deviceName), newDevice]);
                updateForm({ hardware: [...hardwareInfo.filter(device => device.deviceName !== deviceName), newDevice] }, 0);
            }
        }
    };

    const handleInputChange = (e, deviceName, field) => {

        const { value } = e.target;

        setHardwareInfo(prev => prev.map(device => {
        if (device.deviceName === deviceName) {
            return { ...device, [field]: value };
        }
        return device;
        }));

        updateForm({ hardware: hardwareInfo.map(device => {
        if (device.deviceName === deviceName) {
            return { ...device, [field]: value };
        }
        return device;
        })}, 0);

    };

    return (

        <div>

        {/*/////////////////////////////////////////////////////////////////////////////// */}
        {/* IMPELLA */}
        <div className="form-check">
            <input
            className="form-check-input"
            type="checkbox"
            id="impellaCheckbox"
            checked={form.hardware.some(entry => entry.deviceName === "Impella")}
            onChange={(e) => handleCheckboxChange('Impella', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="impellaCheckbox">
            Impella
            </label>
        </div>
        {hardwareInfo.map((device, index) => {
            if (device.deviceName === 'Impella') {
            return (
                <div key={index}>
                <table>
                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={device.position}
                                onChange={(e) => handleInputChange(e, 'Impella', 'position')}
                            />
                        </td>

                        <td>
                            <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  Position</label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={device.p}
                                onChange={(e) => handleInputChange(e, 'Impella', 'p')}
                            />
                        </td>

                        <td>
                            <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  P</label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={device.flow}
                                onChange={(e) => handleInputChange(e, 'Impella', 'flow')}
                            />
                        </td>

                        <td>
                            <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  Flow</label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={device.motorCurrent}
                                onChange={(e) => handleInputChange(e, 'Impella', 'motorCurrent')}
                            />
                        </td>

                        <td>
                            <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  Motor Current </label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={device.alarm}
                                onChange={(e) => handleInputChange(e, 'Impella', 'alarm')}
                            />
                        </td>

                        <td>
                            <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  Alarm</label>
                        </td>
                    </tr>

                </table>
                </div>
            );
            }
            return null;
        })}

        {/*/////////////////////////////////////////////////////////////////////////////// */}
        {/* IABP */}
        <div className="form-check">
            <input
            className="form-check-input"
            type="checkbox"
            id="iabpCheckbox"
            checked={form.hardware.some(entry => entry.deviceName === "IABP")}
            onChange={(e) => handleCheckboxChange('IABP', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="iabpCheckbox">
            IABP
            </label>
        </div>
        {hardwareInfo.map((device, index) => {
            if (device.deviceName === 'IABP') {

            return (
                <div key={index}>

                <table>

                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={device.position}
                                onChange={(e) => handleInputChange(e, 'IABP', 'position')}
                            />
                        </td>

                        <td>
                            <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  Position </label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={device.trigger}
                                onChange={(e) => handleInputChange(e, 'IABP', 'trigger')}
                            />
                        </td>

                        <td>
                            <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  Trigger </label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={device.alarm}
                                onChange={(e) => handleInputChange(e, 'IABP', 'alarm')}
                            />
                        </td>

                        <td>
                            <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  Alarm </label>
                        </td>
                    </tr>

                </table>
                </div>
            );
            }
            return null;
        })}
        {/*/////////////////////////////////////////////////////////////////////////////// */}
        {/* VAD */}
        <div className="form-check">
            <input
            className="form-check-input"
            type="checkbox"
            id="vadCheckbox"
            checked={form.hardware.some(entry => entry.deviceName === "VAD")}
            onChange={(e) => handleCheckboxChange('VAD', e.target.checked)}
            />
            <label className="form-check-label" htmlFor="vadCheckbox">
            VAD
            </label>
        </div>

        {hardwareInfo.map((device, index) => {
            if (device.deviceName === 'VAD') {

            return (
                <div key={index}>


                <table>

                <tr>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={device.type}
                            onChange={(e) => handleInputChange(e, 'VAD', 'type')}
                        />
                    </td>

                    <td>
                        <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  Type </label>
                    </td>
                </tr>

                <tr>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={device.speed}
                            onChange={(e) => handleInputChange(e, 'VAD', 'speed')}
                        />
                    </td>

                    <td>
                        <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  Speed </label>
                    </td>
                </tr>

                <tr>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={device.flow}
                            onChange={(e) => handleInputChange(e, 'VAD', 'flow')}
                        />
                    </td>

                    <td>
                        <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  Flow </label>
                    </td>
                </tr>

                <tr>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={device.power}
                            onChange={(e) => handleInputChange(e, 'VAD', 'power')}
                        />
                    </td>

                    <td>
                        <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  Power </label>
                    </td>
                </tr>

                <tr>
                    <td>
                        <input
                            type="text"
                            className="form-control"
                            value={device.alarm}
                            onChange={(e) => handleInputChange(e, 'VAD', 'alarm')}
                        />
                    </td>

                    <td>
                        <label className="form-control-label" style={{ fontStyle: 'italic', marginTop: '-1.5rem' }}>  Alarm </label>
                    </td>
                </tr>
                </table>
                </div>
            );
            }

            return null;
        })}

        </div>
    );
    };

    export default HardwareForm;
