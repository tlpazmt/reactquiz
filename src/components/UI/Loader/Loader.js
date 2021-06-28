import React from 'react'
import classes from './Loader.module.css'

const Loader = props => (
	<div style={{ textAlign: 'center' }}>
		<div className={classes['Loader']}>
			<div /><div /><div /><div />
		</div>
	</div>
)

export default Loader