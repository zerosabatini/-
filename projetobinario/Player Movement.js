#pragma strict

var sensitivity : float = 3.75;
var speed : float = 6.0;
var speedOriginal : float = 6.0;
var speedSprint : float = 9.0;
var jumpSpeed : float = 8.0;
public var gravity : float = 25.0;
var rotationY : float = 0.0;

private var moveDirection : Vector3 = Vector3.zero;

function Start () {
	Screen.lockCursor = true;
}

function Update() {
	//Controller Mouse
	transform.Rotate(0, Input.GetAxis("Mouse X") * sensitivity, 0);
	
	rotationY += Input.GetAxis("Mouse Y") * sensitivity;
	rotationY = Mathf.Clamp (rotationY, -60, 60);
	transform.localEulerAngles = new Vector3(-rotationY, transform.localEulerAngles.y, 0);
		
	//Controller Keyboard
	var controller : CharacterController = GetComponent(CharacterController);
	
	if (controller.isGrounded) {
		moveDirection = Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
		
		if (Input.GetButtonDown ("Shift")) {speed = speedSprint;}
		if (Input.GetButtonUp ("Shift")) {speed = speedOriginal;}

		if (Input.GetButtonDown ("Fire1")) {transform.position.y -= 0.5; transform.localScale.y = 0.25;}
		if (Input.GetButtonUp ("Fire1")) {transform.position.y += 0.5; transform.localScale.y = 1.0;}
			
		if (Input.GetButton ("Jump")) {moveDirection.y = jumpSpeed;}
	}
	
	moveDirection.y -= gravity * Time.deltaTime;
	
	controller.Move(moveDirection * Time.deltaTime);
}