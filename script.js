document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is now running!'); 

    const button = document.getElementById('demoButton');
    const messageArea = document.getElementById('messageDisplay');
    
    button.addEventListener('click', function() {
        console.log('Button was clicked!'); 
        
        const currentTime = new Date().toLocaleTimeString(); // Get current time
        const message = 'Hello! You clicked the button at ' + currentTime;
        
        messageArea.textContent = message;
        
        button.textContent = 'Thanks for clicking!';
        
        setTimeout(function() {
            button.textContent = 'Click Me!';
        }, 2000); // milliseconds
    });
});