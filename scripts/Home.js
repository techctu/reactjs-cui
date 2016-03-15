'use strict'

import React from 'react'
import Request from 'superagent'
import {
	Container, List, Grid, Group, Link, Slider, View
}
from 'amazeui-touch'
import localeIcoUrl from '../images/local.png'

/**
 * 地理位置定位，使用经纬度定位，实现方式待定
 */
class LocaleInfo extends React.Component {

	constructor(props) {
		super(props)
		this.state.icoUrl = {
			imageUrl: localeIcoUrl,
			locale: props.lastLocale,
			func: props.func // 选择完地理位置的回调函数
		}
	}

	getLocale() {
		// 请求成功，根据经纬度获取信息
		function handleSuccess(position) {
			console.log(position)
		}
		// 请求失败处理
		function handleError(error) {
			console.log(error)
		}
		if (window.navigator.geolocation) {
			var options = {
				enableHighAccuracy: true,
			};
			// 请求浏览器地理位置信息
			window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
		} else {

		}
	}

	render() {
		return (
			<div onClick={}>
				<div>
				<image src={this.state.icoUrl}/><div></div>
				</div>
				<div>
					<img/>
				</div>
			</div>
		)
	}
}



class Home extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View>
				<NavBar></NavBar>
			</View>
		)
	}
}