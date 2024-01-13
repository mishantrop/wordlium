import React from 'react'

import * as commonStyles from '../layout/layout.module.css'

import * as styles from './header.module.css'

type Props = {
    onClickHelp?: () => void;
    onClickLanguage?: () => void;
}

export const Header = ({
    onClickHelp,
    onClickLanguage,
}: Props) => {
    return (
        <header className={styles.header}>
            <div className={commonStyles.container}>
                <div className={styles.content}>
                    <div>Wordlium</div>
                    &nbsp;
                    {onClickHelp && (
                        <button
                            className={styles.iconButton}
                            onClick={onClickHelp}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="24px" height="24px" viewBox="0 0 54.1866 40.64">
                                <g>
                                    <path style={{ fillRule: 'nonzero' }} d="M29.898 26.5722l-4.3921 0c-0.0118,-0.635 -0.0177,-1.0172 -0.0177,-1.1583 0,-1.4229 0.2352,-2.5929 0.7056,-3.5102 0.4704,-0.9231 1.417,-1.952 2.8281,-3.1044 1.4111,-1.1465 2.2578,-1.8991 2.5282,-2.2578 0.4292,-0.5585 0.6409,-1.1818 0.6409,-1.8579 0,-0.9408 -0.3763,-1.7463 -1.1289,-2.4224 -0.7526,-0.6703 -1.7639,-1.0054 -3.0397,-1.0054 -1.2289,0 -2.2578,0.3527 -3.0868,1.0524 -0.8232,0.6997 -1.3935,1.7698 -1.7051,3.2044l-4.4391 -0.5527c0.1234,-2.0578 0.9995,-3.8041 2.6223,-5.2387 1.6286,-1.4346 3.757,-2.152 6.4029,-2.152 2.7752,0 4.9859,0.7291 6.6322,2.1814 1.6404,1.4522 2.4635,3.1397 2.4635,5.0741 0,1.0642 -0.3057,2.0755 -0.9054,3.028 -0.6056,0.9525 -1.8933,2.2519 -3.8688,3.8923 -1.0231,0.8525 -1.6581,1.5346 -1.905,2.052 -0.2469,0.5174 -0.3587,1.4405 -0.3351,2.7752zm-4.3921 6.5087l0 -4.8389 4.8389 0 0 4.8389 -4.8389 0z"/>
                                </g>
                            </svg>
                        </button>
                    )}
                    &nbsp;
                    {onClickLanguage && (
                        <button
                            className={styles.iconButton}
                            onClick={onClickLanguage}
                        >
                            <svg width="24px" height="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                                <g>
                                    <path d="M505.4,278.5c10.2,28,8.5,58-5.1,90c-13.6,32.1-36.5,59.3-68.5,81.8c-3.4,0-5.5-0.3-6.1-1s-3.4-3.9-8.2-9.7
                                    c-4.8-5.8-7.5-9-8.2-9.7c-0.7-2-0.3-3.8,1-5.1c29.3-20.5,49.3-46.4,59.9-77.8c10.6-31.4,8.7-56.6-5.6-75.7
                                    c-5.5,13-12.1,25.9-20,38.9c-7.8,13-17.9,26.6-30.2,40.9c-12.3,14.3-26.9,25.4-44,33.3c-17.1,7.8-35.1,10.4-54.2,7.7
                                    c-17.7-2-32.1-9-43-21c-10.9-11.9-16.4-27.8-16.4-47.6c0-28.6,10.2-53.9,30.7-75.7c17.1-17.1,36.5-28.3,58.3-33.8l-1-51.2
                                    c-47.7,8.2-72.6,12.3-74.7,12.3c-2,0.7-3.8,0-5.1-2c0-0.7-0.9-5.6-2.6-14.8c-1.7-9.2-2.6-14.5-2.6-15.9c-0.7-0.7-0.5-1.4,0.5-2
                                    c1-0.7,2.2-1,3.6-1l79.8-14.3c0-37.5-0.3-57-1-58.3c0-2.7,1.4-4.1,4.1-4.1c15.7,0,24.6-0.3,26.6-1c3.4,0,5.1,1.4,5.1,4.1v53.2
                                    c53.9-7.5,81.8-11.3,83.9-11.3c2.7-1.4,4.4-0.3,5.1,3.1c0,0.7,0.7,4.6,2,11.8c1.4,7.2,2,11.4,2,12.8c1.4,3.4,0.7,5.5-2,6.1
                                    l-90,15.3v52.2h6.1c29.3,0,54.6,6.1,75.7,18.4C482.6,239.6,497.2,256.7,505.4,278.5 M316.1,360.4c9.5,2,20.1,1,31.7-3.1l-2-109.5
                                    c-11.6,4.1-21.8,10.9-30.7,20.5c-15,15-22.5,33.4-22.5,55.2C292.6,346,300.5,358.3,316.1,360.4 M378.6,346
                                    c9.5-8.2,19.4-19.8,29.7-34.8c10.2-15,17.9-28.5,23-40.4c5.1-11.9,6.3-18.9,3.6-21c-12.3-6.1-28.6-9.2-49.1-9.2
                                    c-0.7,0-1.7,0.2-3.1,0.5s-2.4,0.5-3.1,0.5L378.6,346 M149.4,150.6c3.4,9.5,12.4,37.7,27.1,84.4s28.8,91.2,42.5,133.5
                                    c13.6,42.3,20.5,63.8,20.5,64.5c0,1.4-0.7,2-2,2h-44c-2,0-3.1-0.7-3.1-2l-25.6-84.9h-90C58.3,404,49.8,432.3,49.1,433
                                    c0,1.4-1,2-3.1,2H2c-1.4,0-2-0.7-2-2c3.4-6.1,33.4-100.3,90-282.4c0.7-2.7,2.4-4.1,5.1-4.1h49.1
                                    C147.7,146.5,149.4,147.9,149.4,150.6 M82.9,312.3h73.7l-36.8-135.1L82.9,312.3"/>
                                </g>
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
