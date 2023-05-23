import { nanoid } from 'nanoid'
import * as fs from 'fs/promises';
import * as path from 'path'
const contactsPath = path.join("db","contacts.json");


export async function listContacts() {
    try{ 
        const data = await fs.readFile(contactsPath); 
        const contacts = JSON.parse(data);
        return contacts;
       }catch (err) {
           console.log('Something went wrong..');
           console.log(err.message);
         }
     }
  
  export async function getContactById(contactId) {
    try{ 
     const data = await fs.readFile(contactsPath); 
     const text = JSON.parse(data);
     console.log('Contact you are searching for')
     console.log(text.find(contact=> contact.id === contactId));
    }catch (err) {
        console.log('Something went wrong..');
        console.log(err.message);
      }
  }
  
  export async function removeContact(contactId) {
    try{ 
        const data = await fs.readFile(contactsPath); 
        const contacts = JSON.parse(data);
        let deletedContact = contacts.find(contact=>contact.id===contactId);
        if(deletedContact){
            const newContacts =  contacts.filter(contact=>contact.id!==contactId);
            fs.writeFile(contactsPath,JSON.stringify(newContacts));
            console.log("Contact deleted")
            console.log(deletedContact)
        }
        else{ console.log("Contact doesn`t exists")}
        }
    catch (err) {
           console.log('Something went wrong..');
           console.log(err.message);
         }
  }
  
  export async function addContact(name, email, phone) {
    try{ 
      const data = await fs.readFile(contactsPath); 
      const contacts = JSON.parse(data);
    const newContact={
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
        }
    await fs.writeFile(contactsPath,JSON.stringify([...contacts,newContact])); 
    console.log('Contacts updated with')
    console.log(newContact)}
    catch (err) {
        console.log('Something went wrong..');
        console.log(err.message);
      }

  }