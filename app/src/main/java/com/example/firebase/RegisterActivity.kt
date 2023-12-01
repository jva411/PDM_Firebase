package com.example.firebase

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.TextView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase

class RegisterActivity : AppCompatActivity() {
    private lateinit var auth: FirebaseAuth
    private lateinit var database: DatabaseReference

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        auth = FirebaseAuth.getInstance()
        database = Firebase.database.getReference("users")

        findViewById<Button>(R.id.btnRegister).setOnClickListener {
            register(it)
        }
        findViewById<Button>(R.id.btnBackToLogin).setOnClickListener {
            finish()
        }
    }

    private fun register(view: View) {
        val email = findViewById<TextView>(R.id.edtNewEmail).text.toString()
        val pass = findViewById<TextView>(R.id.edtNewSenha).text.toString()
        val name = findViewById<TextView>(R.id.edtNewName).text.toString()
        val age = findViewById<TextView>(R.id.edtNewAge).text.toString().toInt()

        auth.createUserWithEmailAndPassword(email, pass)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    val user = auth.currentUser!!
                    val userChild = database.child(user.uid)
                    userChild.child("uid").setValue(user.uid)
                    userChild.child("name").setValue(name)
                    userChild.child("email").setValue(email)
                    userChild.child("age").setValue(age)
                    Log.d("PDM", "createUserWithEmail:success")

                    val intent = Intent(this, HomeActivity::class.java)
                    intent.putExtra("user",  user)
                    startActivity(intent)
                } else {
                    Log.w("PDM", "createUserWithEmail:failure", task.exception)
                }
            }
    }
}