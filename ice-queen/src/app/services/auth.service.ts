import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth';
//import firebase from 'firebase/compat/app'
//import { User } from './user';
import {
  AngularFirestore,
  //AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afauth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== true || false;
    //return user !== null && user.emailVerified !== false ? true : false;
  }

  async register (email:string, password:string){
    try {
      const result = await this.afauth.createUserWithEmailAndPassword(email,password )
      return !!result
    } catch (error) {
      console.log('error en login: ', error)
      return false;
    }
  }

  async login(email: string, password:string){
    try {
       const result  = await this.afauth.signInWithEmailAndPassword(email,password)
       return !!result
    }catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Usuario o contraseña incorrecta',
      })
      return false;
    }
  }

  getUserLogged(){
    return this.afauth.authState
  }

  async SignOut() {
    await this.afauth.signOut();
    localStorage.removeItem('user');
    return this.router.navigate(['home']);
  }

  /*
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }


  async findUser(user:any){
    try {
      await this.afauth.onAuthStateChanged(user);
    }catch(err){
    console.log(err);
    }
  };

  async loginWithGoogle(email:string, password:string){
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    } catch (error) {
      console.log('error en login con Google: ', error)
      return null;
    }
  }

  SignIn(email: string, password: string) {
    return this.afauth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrecta',

        })
      });
  }*/
};
