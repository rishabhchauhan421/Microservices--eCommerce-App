import request from 'supertest';
import { app } from '../../app';

it('fails when email supplied does not exists', async ()=>{
    await request(app)
        .post('/api/users/signin')
        .send({
            email : 'abc@abc.com',
            password : '12345'
        }).expect(400);
})

it('fails when email with wrong credentials', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email : 'abc@abc.com',
            password : '12345'
        }).expect(201);
    await request(app)
        .post('/api/users/signin')
        .send({
            email : 'abc@abc.com',
            password : '12345'
        }).expect(200);
})

it('fails when email with wrong credentials', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email : 'abc@abc.com',
            password : '12345'
        }).expect(201);
    await request(app)
        .post('/api/users/signin')
        .send({
            email : 'abc@abc.com',
            password : '123'
        }).expect(400);
})

it('successful login', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email : 'abc@abc.com',
            password : '12345'
        }).expect(201);
    
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email : 'abc@abc.com',
            password : '12345'
        }).expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
})