package com.example.firebase

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.core.text.isDigitsOnly
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase

class RegisterActivity : AppCompatActivity() {
    private lateinit var auth: FirebaseAuth
    private lateinit var database: DatabaseReference
    private lateinit var tvErrorMessage: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        auth = FirebaseAuth.getInstance()
        database = Firebase.database.getReference("users")
        tvErrorMessage = findViewById(R.id.tvRegisterErrorMessage)

        findViewById<Button>(R.id.btnRegister).setOnClickListener {
            tvErrorMessage.visibility = View.INVISIBLE
            register(it)
        }
        findViewById<Button>(R.id.btnBackToLogin).setOnClickListener {
            finish()
        }
    }

    private fun register(view: View) {
        val email = findViewById<TextView>(R.id.edtNewEmail).text.toString().trim()
        val pass = findViewById<TextView>(R.id.edtNewSenha).text.toString().trim()
        val name = findViewById<TextView>(R.id.edtNewName).text.toString().trim()
        val age = findViewById<TextView>(R.id.edtNewAge).text.toString().trim()

        if (email.isEmpty() || pass.isEmpty() || name.isEmpty() || age.isEmpty() || !email.contains("@") || !age.isDigitsOnly()) {
            tvErrorMessage.visibility = View.VISIBLE
            return
        }

        auth.createUserWithEmailAndPassword(email, pass)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    val user = auth.currentUser!!
                    val userChild = database.child(user.uid)
                    userChild.child("uid").setValue(user.uid)
                    userChild.child("name").setValue(name)
                    userChild.child("email").setValue(email)
                    userChild.child("age").setValue(age.toInt())
                    Log.d("PDM", "createUserWithEmail:success")

                    val intent = Intent(this, HomeActivity::class.java)
                    intent.putExtra("user",  user)
                    startActivity(intent)
                } else {
                    Log.w("PDM", "createUserWithEmail:failure", task.exception)
                    tvErrorMessage.visibility = View.VISIBLE
                }
            }
    }
}