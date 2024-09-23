const inputTxt = document.getElementById('input');
const image = document.getElementById('image');
const button = document.getElementById('btn');
const spinner = document.getElementById('spinner');

async function query(input) {
    const response = await fetch('https://text-to-image-app-backend.vercel.app/generate-image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.blob();
    return result;
}

button.addEventListener('click', async function () {
    try {
        const input = inputTxt.value;
        if (!input) {
            alert("Please enter a text prompt");
            return;
        }
        
        // Show loading spinner and disable button
        spinner.style.display = 'block';
        button.disabled = true;
        image.style.display = 'none';
        
        const response = await query(input);
        
        // Hide spinner and enable button
        spinner.style.display = 'none';
        button.disabled = false;
        
        // Display the image
        image.src = URL.createObjectURL(response);
        image.style.display = 'block';
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while generating the image.");
        
        // Hide spinner and enable button in case of error
        spinner.style.display = 'none';
        button.disabled = false;
    }
});