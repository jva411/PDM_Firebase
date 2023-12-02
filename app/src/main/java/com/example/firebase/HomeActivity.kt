package com.example.firebase

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase

class HomeActivity : AppCompatActivity() {
    private lateinit var user: FirebaseUser
    private lateinit var userData: UserData
    private lateinit var auth: FirebaseAuth
    private lateinit var database: DatabaseReference


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        user = intent.getParcelableExtra("user")!!
        database = Firebase.database.getReference("users")
        auth = FirebaseAuth.getInstance()

        val txtUser = findViewById<TextView>(R.id.tvUserName)
        database.child(user.uid).get().addOnCompleteListener {
            if (it.isSuccessful) {
                userData = UserData(
                    it.result.child("uid").value.toString(),
                    it.result.child("email").value.toString(),
                    it.result.child("name").value.toString(),
                    it.result.child("age").value.toString().toInt()
                )

                txtUser.text = userData.name
                findViewById<EditText>(R.id.edtUpdateName).setText(userData.name)
                findViewById<EditText>(R.id.edtUpdateAge).setText(userData.age.toString())
            } else {
                txtUser.text = "Erro ao obter os dados do usuário"
                Log.d("PDM", it.result.toString())
            }
        }
        findViewById<Button>(R.id.btnLogout).setOnClickListener {
            logout(it)
        }
        findViewById<Button>(R.id.btnUpdate).setOnClickListener {
            update(it)
        }
    }

    private fun logout(view: View) {
        auth.signOut()
        finish()
    }

    private fun update(view: View) {
        val pass = findViewById<EditText>(R.id.edtUpdatePassword).text.toString()
        if (pass != "") user.updatePassword(pass)

        val name = findViewById<EditText>(R.id.edtUpdateName).text.toString()
        if (name != userData.name) database.child(user.uid).child("name").setValue(name)

        val age = findViewById<EditText>(R.id.edtUpdateAge).text.toString().toInt()
        if (age != userData.age) database.child(user.uid).child("age").setValue(age)
    }
}