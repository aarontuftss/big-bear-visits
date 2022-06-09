import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';

import './PropertyPage.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function PropertyPage(props) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    function handleSelect(ranges) {
        console.log(ranges);
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
    }



    return (
        <>
            <div className='propertyPage-main'>
                Hello
                <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                />
            </div>
        </>
    )
}

export default PropertyPage;