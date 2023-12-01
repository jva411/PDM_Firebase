package com.example.firebase

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.Switch
import android.widget.TextView
import android.widget.Toast
import com.google.firebase.auth.FirebaseAuth

class MainActivity: AppCompatActivity() {
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        auth = FirebaseAuth.getInstance()
        findViewById<Button>(R.id.btnLogin).setOnClickListener {
            logar(it)
        }
        findViewById<Button>(R.id.btnRegisterRedirect).setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        // keep user data
        super.onSaveInstanceState(outState)
    }

    fun logar(v: View) {
        val edtLogin = findViewById<EditText>(R.id.edtEmail)
        val edtPass = findViewById<EditText>(R.id.edtSenha)

        auth.signInWithEmailAndPassword(edtLogin.text.toString(), edtPass.text.toString())
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    // Sign in success, update UI with the signed-in user's information
                    Log.d("PDM", "signInWithEmail:success")
                    val user = auth.currentUser
                    val intent = Intent(this, HomeActivity::class.java)
                    intent.putExtra("user",  user)
                    startActivity(intent)

                    Toast.makeText(baseContext, "Autenticado com Sucesso!\n${auth.currentUser?.email}", Toast.LENGTH_SHORT)
                        .show()
                } else {
                    // If sign in fails, display a message to the user.
                    Log.w("PDM", "signInWithEmail:failure", task.exception)
                    Toast.makeText(
                        baseContext,
                        "Problemas na Autenticação.",
                        Toast.LENGTH_SHORT,
                    ).show()
                }
            }
    }

}