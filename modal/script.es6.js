class ModalClab{

	get behaviors() {
		return [AnimationsBehavior];
	}

	/*set behaviors(value) {
		this._behaviors = value;
	}*/

	beforeRegister(){
		this.is = 'modal-clab';
		this.properties = {
			title: {
				type: String,
				value: 'Modal title'
			},
			visible: {
				type: Boolean,
				value: false,
				observer: '_animateShowHide'
			},
			primary: {
				type: String
			},
			primaryDisabled:{
				type:Boolean,
				value:false
			},
			secondary: {
				type: String
			},
			warningBtn: {
				type: String
			},
			content: {
				type: String,
				value: null
			},
			noAnimation:{
				type:Boolean,
				value:false
			},
			stopClose:{
				type:Boolean,
				value:false
			}
		};
	}

	attached(){
		// Preparing the animations
		if(!this.noAnimation){
			let opacity=[
				{opacity: 0},
				{opacity: 1}
			];
			let scale=[
				{transform: 'scale(.95)'},
				{transform: 'scale(1)'}
			];

			this.modalEnter = (target)=>{
				return new GroupEffect([
					new KeyframeEffect(target, opacity, {
						duration:190,
						fill:'forwards',
						direction: 'normal'
					}),
					new KeyframeEffect(this.querySelector('.modal'), scale, {
						duration:190,
						fill:'forwards',
						direction: 'normal'
					})
				]);
			}
			this.modalExit = (target)=>{
				return new GroupEffect([
					new KeyframeEffect(target, opacity, {
						duration:150,
						fill:'forwards',
						direction: 'reverse'
					}),
					new KeyframeEffect(this.querySelector('.modal'), scale, {
						duration:150,
						fill:'forwards',
						direction: 'reverse'
					})
				]);
			}
		}
	}



	/*----------
		EVENT HANDLERS
	----------*/
	_closeModal(evt){
		evt.stopPropagation();
		if(!this.stopClose) this.visible=false;
		this.fire('close');
	}

	_block(evt){
		evt.stopPropagation();
	}

	_primaryAction(evt){
		this.fire('modal-primary');
	}

	_secondaryAction(evt){
		this.fire('modal-secondary');
	}

	_thirdAction(evt){
		this.fire('modal-third');
	}



	/*----------
		OBSERVERS
	----------*/
	_animateShowHide(val, oldval){
		let target=this.querySelector('.modal-overlay');

		if(oldval!=undefined){
			if(val){
				document.querySelector('body').classList.add('no-scroll');
				target.style.display='block';
				if(!this.noAnimation) {
					let animation= this.modalEnter(target);
					let player = document.timeline.play(animation);
				} else {
					target.style.opacity=1;
				}
			} else {
				document.querySelector('body').classList.remove('no-scroll');
				if(!this.noAnimation){
					let animation= this.modalExit(target);
					let player = document.timeline.play(animation);
					this._onAnimationComplete(player, ()=>{
						target.style.display='none';
					});
				} else {
					target.style.display='none';
					target.style.opacity=0;
				}
			}
		}
	}



	/*----------
		COMPUTE
	----------*/
	_checkIfTrue(str){
		if(str!=undefined && str.length>0){
			return true;
		} else {
			return false;
		}
	}



	/*----------
		PUBLIC
	----------*/
	show(){
		this.visible=true;
	}
	hide(){
		this.visible=false;
	}
}


Polymer(ModalClab);
