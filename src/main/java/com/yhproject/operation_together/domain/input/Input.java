package com.yhproject.operation_together.domain.input;

import com.yhproject.operation_together.domain.BaseTimeEntity;
import com.yhproject.operation_together.domain.operation.Operation;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Input extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(length = 20, nullable = false)
    public String name;

    @Column(nullable = false)
    public int position;

    @Column(length = 50, nullable = false)
    public String content;

    @ManyToOne
    @JoinColumn(name = "operation_id")
    private Operation operation;

    @Builder
    public Input(String name, int position, String content) {
        this.name = name;
        this.position = position;
        this.content = content;
    }
}
