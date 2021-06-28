import React, { Component } from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { connect } from 'react-redux'

class Layout extends Component {
	state = {
		menu: false
	}

	toggleMenuHandler = () => {
		this.setState({
			menu: !this.state.menu
		})
	}

	closeHandler = () => this.setState({ menu: false })

	render() {
		return (
			<div className={classes['Layout']}>
				<Drawer isOpen={this.state.menu}
					onClose={this.closeHandler}
					isAuth={this.props.isAuth} />
				<MenuToggle onToggle={this.toggleMenuHandler}
					isOpen={this.state.menu} />
				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuth: !!state.auth.token
	}
}

export default connect(mapStateToProps)(Layout)