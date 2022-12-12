from diffusers import StableDiffusionPipeline, EulerDiscreteScheduler
import torch


model_id = "stabilityai/stable-diffusion-2"

def generate_image(size_x, size_y, prompt):
    scheduler = EulerDiscreteScheduler.from_pretrained(model_id, subfolder="scheduler")
    pipe = StableDiffusionPipeline.from_pretrained(model_id, scheduler=scheduler, revision="fp16", torch_dtype=torch.float16) #Half precision
    # pipe = StableDiffusionPipeline.from_pretrained(model_id, scheduler=scheduler, torch_dtype=torch.float16) #Full precision
    pipe = pipe.to("cuda")

    image = pipe(prompt, height=size_x, width=size_y).images[0]

    path = f"stable_diffusion_{prompt.replace(' ', '_')[:20 if len(prompt) >= 20 else len(prompt)]}.png"

    image.save("output/" + path)

    return path
